const Patterns = {
    GSTNO: "^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$",
    PANNO: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
    PHONENO: "^[0-9]{10,10}$",
    PIN: "^[1-9][0-9]{5}$"
}
export { Patterns };


