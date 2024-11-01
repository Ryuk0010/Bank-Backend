"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/bankBackend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
        status: req.body.status
    };
    try {
        // Forward the data to another URL
        const response = yield axios_1.default.post("http://localhost/3003", paymentInformation);
        // Respond back with the response from the target URL
        res.status(response.status).json(response.data);
    }
    catch (error) {
        console.error("Error forwarding request:", error);
        res.status(500).json({ message: "Failed to forward payment information." });
    }
}));
app.listen(3005, () => {
    console.log("Server running on port 3005");
});
