import { NoImage } from "assets/images";

export function isValidateDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

export function isString(value) {
    if (value != null && typeof value == "string") {
        return true;
    }
    return false;
}

export function isFloat(value, isPositive = true) {
    if (
        value != null &&
        typeof value == "number" &&
        Number.isInteger(value) == false
    ) {
        if (isPositive) {
            if (value >= 0) {
                return true;
            }
        } else {
            return true;
        }
    }
    return false;
}

export function isInteger(value, isPositive = true) {
    if (value != null && typeof value == "number" && Number.isInteger(value)) {
        if (isPositive) {
            if (value >= 0) {
                return true;
            }
        } else {
            return true;
        }
    }
    return false;
}

export function isEmpty(value) {
    if (
        typeof value == "undefined" ||
        value == "" ||
        value == null ||
        (value != null &&
            typeof value == "object" &&
            !Object.keys(value).length)
    ) {
        return true;
    }

    return false;
}

export function setNoImage() {
    return NoImage;
}
