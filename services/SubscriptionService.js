const MercadoPago = require("mercadopago");

class SubscriptionService {
  constructor() {
    MercadoPago.configure({
      client_id: "client_id",
      //acá va TU client_id
      client_secret: "client_secret"
      //acá va TU client_secret
    });
  }

  async getSubscriptionLink() {
    const preference = {
      payer_email: "test@gmail.com",
      //email del usuario comprador
      reason: "prueba de subscripción",
      external_reference: "",
      back_url: "https://www.mipaginaweb.com/gracias",
      //si se completa el pago
      auto_recurring: {
        //objeto para crear la subscripción
        frequency: 1,
        // frecuencia de cobro
        frequency_type: "months",
        //tipo de frecuencia
        //en este ejemplo es 1 vez al mes
        transaction_amount: 100,
        //precio de la suscripción
        currency_id: "ARS"
        //moneda a cobrar
      }
    };

    try {
      const mp = await MercadoPago.preapproval.create(preference);
      //usamos el sdk de mercado pago

      const linkCheckout = mp && mp.response && mp.response.init_point;
      //obtenemos el link

      return linkCheckout;
      //le devolvemos el link al controller
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = SubscriptionService;
