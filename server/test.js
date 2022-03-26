const a = [
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
    { a: "2" },
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
    { a: "sda" },
];

const b = a.filter((s) => {
    if (s.a === "2") {
        s.err = "user exist";
        return s;
    }
    return s;
});
