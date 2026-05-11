namespace BackendApi.Services
{
    public class SimuladorService
    {
        public decimal Calcular(decimal valor, int dias, decimal taxa)
        {
            decimal rendimento = valor * (taxa / 100) * dias / 365;

            decimal ir = ObterIR(dias);
            decimal imposto = rendimento * ir;

            return valor + rendimento - imposto;
        }

        private decimal ObterIR(int dias)
        {
            if (dias <= 180) return 0.225m;
            if (dias <= 360) return 0.20m;
            if (dias <= 720) return 0.175m;

            return 0.15m;
        }
    }
}
