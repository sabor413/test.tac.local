﻿define([], function() {
  var condition = function(context, args) {
    var control = context.app[args.targetControlId],
        propertyName = args.propertyName,
        operatorid = args.operatorid,
        value = args.value || "";

    if (!control) {
      throw "Control '" + name + "' not found";
    }

    var propertyValue = control[propertyName];
    if (propertyValue === undefined) {
      propertyValue = "undefined";
    }

    if (propertyValue === null) {
      propertyValue = "null";
    }

    switch (operatorid) {
      case "{10537C58-1684-4CAB-B4C0-40C10907CE31}":
        return propertyValue.toString() == value;
      case "{537244C2-3A3F-4B81-A6ED-02AF494C0563}":
        return propertyValue.toUpperCase() === value.toUpperCase();
      case "{2E67477C-440C-4BCA-A358-3D29AED89F47}":
        return propertyValue.indexOf(value) >= 0;
      case "{A6AC5A6B-F409-48B0-ACE7-C3E8C5EC6406}":
        return propertyValue.toString() != value;
      case "{6A7294DF-ECAE-4D5F-A8D2-C69CB1161C09}":
        return propertyValue.toUpperCase() !== value.toUpperCase();
      case "{22E1F05F-A17A-4D0C-B376-6F7661500F03}":
        return propertyValue.substr(propertyValue.length - value.length) === value;
      case "{FDD7C6B1-622A-4362-9CFF-DDE9866C68EA}":
        return propertyValue.substr(0, value.length) === value;
      case "{F8641C26-EE27-483C-9FEA-35529ECC8541}":
        throw "Regular expression not supported";
    }

    return false;
  };

  return condition;
});