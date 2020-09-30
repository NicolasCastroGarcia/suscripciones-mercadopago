class SubscriptionController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getMercadoPagoSubscriptionLink(req, res) {
    //acá hay que realizar las validaciones
    const getLink = await this.subscriptionService.getSubscriptionLink();

    if (getLink) {
      //si existe el link
      res.status(200).json({
        msg: "Link creado correctamente",
        link: getLink
      });
    } else {
      res.status(500).json({
        error: true,
        msg: "Hubo un error al crear el link"
      });
    }
  }
}
module.exports = SubscriptionController;
