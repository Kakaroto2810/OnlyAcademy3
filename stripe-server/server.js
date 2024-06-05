const express = require('express');
const stripe = require('stripe')('sk_test_51PIVHrJPAJMz2CjbNYkaw7juaTYY62O5vCfQgrlZyBFabDBo9FlnV79tohmaSlt8D64C8nwugLVz2ICevi91pHMv000Notbqod');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/payment-sheet', async (req, res) => {
  const { amount } = req.body; // Recebe o valor do corpo da solicitação

  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2024-04-10'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Utiliza o valor recebido
      currency: 'brl',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
