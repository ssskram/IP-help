import * as React from 'react';
import Accordion from 'react-responsive-accordion';

export class SelfService extends React.Component<any, any> {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {
        return <div className="centered">

            <Accordion>
                <div data-trigger="Self service">
                    <h1 className="text-center">These are for you</h1>
                    <h4 className="text-center">If something is missing, please let us know</h4>
                </div>

                <div data-trigger="Departmental Liaisons to I&P" style={{ fontWeight: '600' as any }}>
                    <div>
                        <h4><b>Troubleshooting</b></h4>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/I&PLiaisonGuidelinesv5.pdf" target="_blank" className="btn btn-selfservice">
                            FAQ for Liaisons
                        </a>
                        <h4><b>User guides</b></h4>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/PC%20Ordering%20Guidelines%2011_2018.pdf" target="_blank" className="btn btn-selfservice">
                            Guidelines for ordering PCs
                        </a>
                    </div>
                </div>

                <div data-trigger="Spotlight: Readitfor.me" className="special">
                    <div>
                        <div className="row ss-center">
                            <h2>Self Service Spotlight</h2>
                            Introducing the new learning resource that is available to all employees!<br />
                            <strong>Readitfor.me</strong> is a place to learn, retain and apply the ideas from the best personal development books in the world.
                            <hr />
                        </div>
                        <div className="col-sm-6">
                            <ul>
                                <li>
                                    <p>Read, listen or watch video summaries of popular professional books.</p>
                                </li>
                                <li>
                                    <p>The service is unlimited, so use it as much as you want!</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <ul>
                                <li>
                                    <p><a href="https://readitfor.me/ pittsburghpa" target="_blank">Follow this link to create an account with your work email.</a></p>
                                </li>
                                <li>
                                    <p>Enjoy "speed reading" today!</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div data-trigger="APRS">
                    <div>
                        <h4><b>Troubleshooting</b></h4>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Problem%20with%20user%20viewing%20all%20of%20the%20APRS%20screen%20(1).pdf" target="_blank" className="btn btn-selfservice">
                            Can't see the entire screen
                            </a>
                    </div>
                </div>

                <div data-trigger="Legistar">
                    <div>
                        <h4><b>User guides</b></h4>
                        <a href="http://www.dconc.gov/home/showdocument?id=12259" target="_blank" className="btn btn-selfservice">
                            Legistar 5
                            </a>
                    </div>
                </div>

                <div data-trigger="Microsoft Office 365">
                    <div>
                        <h4><b>Training resources</b></h4>
                        <a href="https://pittsburgh.o365support.com/library" target="_blank" className="btn btn-selfservice">
                            Library of Training Topics
                        </a>
                        <a href="https://o365support.com/tips-and-tricks/" target="_blank" className="btn btn-selfservice">
                            Microsoft 365 Webinars
                            </a>
                        <a href="https://pittsburgh.o365support.com/content/view?cguid=48b2679e-0dc1-11e8-8108-000d3a908cc1&statusid=9" title="Email and calendar" target="_blank" className="btn btn-selfservice">
                            Outlook 2016 (Desktop)
                            </a>
                        <a href="https://pittsburgh.o365support.com/content/view?cguid=e8faa151-56c5-11e7-80df-000d3a908cc1&tiguid=749a2e9c-8ae7-11e4-847a-00221918ee60&rtid=3" title="Email and calendar" target="_blank" className="btn btn-selfservice">
                            Outlook (Online)
                            </a>
                        <a href="https://pittsburgh.o365support.com/content/view?cguid=4d4a1040-0c41-11e8-8108-000d3a908cc1&statusid=9" title="Docs, spreadhseets, and slideshows" target="_blank" className="btn btn-selfservice">
                            Word, Excel, & PowerPoint 2016 (Desktop)
                            </a>
                        <a href="https://pittsburgh.o365support.com/content/view?cguid=f69832ef-5779-11e7-80df-000d3a908cc1&statusid=9" title="Personal cloud storage" target="_blank" className="btn btn-selfservice">
                            OneDrive for Business
                            </a>
                        <a href="https://pittsburgh.o365support.com/content/view?cguid=d42016bc-578d-11e7-80df-000d3a908cc1&statusid=9" title="Project and team sites" target="_blank" className="btn btn-selfservice">
                            SharePoint Online
                            </a>
                        <a href="https://pittsburgh.o365support.com/content/view?cguid=0743140d-585a-11e7-80df-000d3a908cc1&statusid=9" title="Messaging and video chat" target="_blank" className="btn btn-selfservice">
                            Skype for Business
                            </a>
                    </div>
                </div>

                <div data-trigger="Municode">
                    <div>
                        <h4><b>User guides</b></h4>
                        <a href="http://www.hillcrestil.us/uploads/Municode%20Website%20-%20User%20Guide.pdf" target="_blank" className="btn btn-selfservice">
                            Municode
                            </a>
                    </div>
                </div>

                <div data-trigger="Printers & MFDs">
                    <div>
                        <h4><b>User guides</b></h4>
                        <a href="https://cityofpittsburgh-my.sharepoint.com/personal/andrew_hayhurst_pittsburghpa_gov/_layouts/15/onedrive.aspx?slrid=eb205c9e-1028-5000-e3c3-69893cfcaff7&id=%2fpersonal%2fandrew_hayhurst_pittsburghpa_gov%2fDocuments%2fPrinter+Deployment+Project%2fAmcom%2fTraining+Docs+-+Public%2fAmcom+Printer+Specific+Handouts&FolderCTID=0x012000ECAE49CC4657A84AAE592CC0E052EDF4" target="_blank" className="btn btn-selfservice">
                            Printer guides
                            </a>
                        <a href="https://cityofpittsburgh-my.sharepoint.com/personal/andrew_hayhurst_pittsburghpa_gov/_layouts/15/onedrive.aspx#slrid=ef205c9e-60aa-5000-e3c3-6f374cf89689&id=%2fpersonal%2fandrew_hayhurst_pittsburghpa_gov%2fDocuments%2fPrinter+Deployment+Project%2fAmcom%2fTraining+Docs+-+Public&FolderCTID=0x012000ECAE49CC4657A84AAE592CC0E052EDF4" target="_blank" className="btn btn-selfservice">
                            Instructions to connect
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Printer%20Troubleshooting.pdf" target="_blank" className="btn btn-selfservice">
                            Troubleshooting
                            </a>
                    </div>
                </div>

                <div data-trigger="RSA Tokens">
                    <div>
                        <h4><b>User guides</b></h4>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/RSA%20token%20instructions%20-%202018%20pdf.pdf" target="_blank" className="btn btn-selfservice">
                            RSA Tokens
                            </a>
                    </div>
                </div>

                <div data-trigger="Telephone & Voicemail">
                    <div>
                        <h4><b>User guides</b></h4>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Remote%20VoiceMail%20Access%20for%20CCB%20and%20Police%20HQ.pdf" target="_blank" className="btn btn-selfservice">
                            Remote voicemail access for CCB & PBP HQ
                            </a>
                    </div>
                </div>

                <div data-trigger="Windows 7">
                    <div>
                        <h4><b>User guides</b></h4>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Create%20Desktop%20Shortcuts%20in%20Windows%207.pdf" target="_blank" className="btn btn-selfservice">
                            Create a folder shortcut
                            </a>
                        <a href="http://apps.pittsburghpa.gov/redtail/images/1354_Create_Shortcuts_to_Websites_in_Windows_7.pdf" target="_blank" className="btn btn-selfservice">
                            Create a website shortcut
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Install_Printers_Scanning_Win7.pdf" target="_blank" className="btn btn-selfservice">
                            Configure printers & scanning
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Set%20Default%20Printer%20in%20Windows%207.pdf" target="_blank" className="btn btn-selfservice">
                            Set a default printer
                            </a>
                        <a href="http://apps.pittsburghpa.gov/redtail/images/1355_Finding_Your_Computer_Name_in_Windows_7.pdf" target="_blank" className="btn btn-selfservice">
                            Find your computer's name
                            </a>
                        <a href="http://apps.pittsburghpa.gov/redtail/images/1356_Map_a_Network_Drive_in_Windows_7.pdf" target="_blank" className="btn btn-selfservice">
                            Map a network drive
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Fax%20Documents%20from%20a%20Computer%20in%20Windows%2010.pdf" target="_blank" className="btn btn-selfservice">
                            Fax a document from the computer
                            </a>
                    </div>
                </div>

                <div data-trigger="Windows 10">
                    <div>
                        <h4><b>Training resources</b></h4>
                        <a href="https://pittsburgh.o365support.com/content/view?cguid=b4de581b-5792-11e7-80df-000d3a908cc1&statusid=9" target="_blank" className="btn btn-selfservice">
                            Windows 10
                            </a>
                        <h4><b>User guides</b></h4>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Create%20Desktop%20Shortcuts%20in%20Windows%2010.pdf" target="_blank" className="btn btn-selfservice">
                            Create a folder shortcut
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Create%20Shortcut%20to%20a%20Website%20in%20Windows%2010.pdf" target="_blank" className="btn btn-selfservice">
                            Create a website shortcut
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Install_Printers_Scanning_Win10.pdf" target="_blank" className="btn btn-selfservice">
                            Configure printers & scanning
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Set%20Default%20Printer%20in%20Windows%2010.pdf" target="_blank" className="btn btn-selfservice">
                            Set a default printer
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Map%20a%20Network%20Drive%20in%20Windows%2010.pdf" target="_blank" className="btn btn-selfservice">
                            Map a network drive
                            </a>
                        <a href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Fax%20Documents%20from%20a%20Computer%20in%20Windows%2010.pdf" target="_blank" className="btn btn-selfservice">
                            Fax a document from the computer
                            </a>
                    </div>
                </div>

            </Accordion>
        </div>;
    }
}