import * as React from "react";
import { checkAvailability } from "../availableItems";
import * as style from "../style";

export default class SelectAccessories extends React.Component<any, any> {
  public render() {
    const { availableItems, selectedTypes } = this.props.parentState;

    const { addRemoveItem } = this.props;

    return (
      <div className="col-md-4 col-md-offset-4 panel">
        <div className="sectionHeader">Accessories</div>
        <div className="panel-body text-center">
          {checkAvailability(
            "Portable Projector Screen",
            availableItems,
            "Accessory"
          ) && (
            <button
              className="btn btn-big"
              onClick={() =>
                addRemoveItem("Portable Projector Screen", "Accessory")
              }
              style={
                selectedTypes.includes("Portable Projector Screen")
                  ? style.clicked
                  : style.unclicked
              }
            >
              Portable Projector Screen
            </button>
          )}
          {checkAvailability("VGA Cable", availableItems, "Accessory") && (
            <button
              className="btn btn-big"
              onClick={() => addRemoveItem("VGA Cable", "Accessory")}
              style={
                selectedTypes.includes("VGA Cable")
                  ? style.clicked
                  : style.unclicked
              }
            >
              VGA Cable
            </button>
          )}
          {checkAvailability("HDMI Cable", availableItems, "Accessory") && (
            <button
              className="btn btn-big"
              onClick={() => addRemoveItem("HDMI Cable", "Accessory")}
              style={
                selectedTypes.includes("HDMI Cable")
                  ? style.clicked
                  : style.unclicked
              }
            >
              HDMI Cable
            </button>
          )}
          {checkAvailability("Clicker", availableItems, "Accessory") && (
            <button
              className="btn btn-big"
              onClick={() => addRemoveItem("Clicker", "Accessory")}
              style={
                selectedTypes.includes("Clicker")
                  ? style.clicked
                  : style.unclicked
              }
            >
              Clicker
            </button>
          )}
          {checkAvailability(
            "Long Extension Cord",
            availableItems,
            "Accessory"
          ) && (
            <button
              className="btn btn-big"
              onClick={() => addRemoveItem("Long Extension Cord", "Accessory")}
              style={
                selectedTypes.includes("Long Extension Cord")
                  ? style.clicked
                  : style.unclicked
              }
            >
              Long Extension Cord
            </button>
          )}
          {checkAvailability(
            "VDI to USB Adapter",
            availableItems,
            "Accessory"
          ) && (
            <button
              className="btn btn-big"
              onClick={() => addRemoveItem("VDI to USB Adapter", "Accessory")}
              style={
                selectedTypes.includes("VDI to USB Adapter")
                  ? style.clicked
                  : style.unclicked
              }
            >
              VDI to USB Adapter
            </button>
          )}
        </div>
      </div>
    );
  }
}
