namespace Chapter2
{
    // List 2-35
    public class ModelNumber
    {
        // 표현력 증가
        private readonly string productCode;
        private readonly string branch;
        private readonly string lot;

        public ModelNumber(string productCode, string branch, string lot)
        {
            // 무결성 유지
            if (productCode == null) throw new ArgumentNullException(nameof(productCode));
            if (branch == null) throw new ArgumentNullException(nameof(branch));
            if (lot == null) throw new ArgumentNullException(nameof(long));

            this.productCode = productCode;
            this.branch = branch;
            this.lot = lot;
        }

        public string ToString()
        {
            return productCode + "-" + branch + "-" + lot;
        }
    }
}