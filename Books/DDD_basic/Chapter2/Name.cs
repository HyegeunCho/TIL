namespace Chapter2
{
    public class Name
    {
        private readonly string value;

        public Name(string value)
        {
            if (value == null) throw new ArgumentNullException(nameof(value));
            if (!Regex.IsMatch(value, @"^[a-zA-Z]+$")) throw new ArgumentException("허가되지 않은 문자가 사용됨", nameof(value));

            this.value = value;
        }
    }
}