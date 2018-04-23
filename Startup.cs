﻿﻿using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.WindowsAzure.Storage.Blob;
using IP_Help.Data;
using IP_Help.Models;

namespace IP_Help
{
    public class Startup
    {
        string _MSClientID = null;
        string _MSClientSecret = null;
        string _sendgrid = null;
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            _MSClientID = Configuration["MSClientId"];
            _MSClientSecret = Configuration["MSClientSecret"];
            _sendgrid = Configuration["sendgrid"];

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase(Guid.NewGuid().ToString()));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication().AddMicrosoftAccount(microsoftOptions =>
                {
                    microsoftOptions.ClientId = Configuration["MSClientId"];
                    microsoftOptions.ClientSecret = Configuration["MSClientSecret"];
                });

            // begin sso config
            string uri = Configuration.GetValue<string>("SSOuri");
            Uri storageUri = new Uri($"{uri}");
            CloudBlobClient blobClient = new CloudBlobClient(storageUri);
            CloudBlobContainer container = blobClient.GetContainerReference("keys");
            container.CreateIfNotExistsAsync();
            services.AddDataProtection()
                .SetApplicationName("PGH_SSO")
                .PersistKeysToAzureBlobStorage(container, "keys.xml");
            services.ConfigureApplicationCookie(options => {
                options.Cookie.Name = ".PGH_SSO";
            });
            // end sso config

            // add application services
            Environment.SetEnvironmentVariable("sendgrid", Configuration["sendgrid"]);

            services.AddMvc()
                .AddSessionStateTempDataProvider();

            services.AddDistributedMemoryCache();
            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSession(); 

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
