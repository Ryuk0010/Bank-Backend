import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/bankBackend", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
        status: req.body.status
    };

    try {
        // Send data to another webhook endpoint
        const response = await axios.post("http://localhost:3003/hdfcWebhook", {
            token: paymentInformation.token,
            userId: Number(paymentInformation.userId),
            amount: Number(paymentInformation.amount),
            status: String(paymentInformation.status)
        });

        console.log("Sent data to webhook with response:", response.data);

        // Respond back with the response from the target URL
        res.status(response.status).json(response.data);
    } catch (error:any) {
        console.error("Error forwarding request:", error);

        // Enhanced logging of the error response
        if (axios.isAxiosError(error)) {
            console.error("Response data:", error.response?.data);
            console.error("Response status:", error.response?.status);
            console.error("Response headers:", error.response?.headers);
        } else {
            console.error("Error message:", error.message);
        }

        res.status(500).json({ message: "Failed to forward payment information." });
    }
});

app.listen(3005, () => {
    console.log("Server running on port 3005");
});
