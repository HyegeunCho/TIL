namespace Chapter3
{
    public class UserId
    {
        private string value;

        public UserId(string value)
        {
            if (value == null) throw new AgrumentNullException(nameof(value));
            this.value = value;
        }

    }

    public class User : IEquatable<User>
    {
        private UserId id;
        private string name;

        public User(string name)
        {
            if (id == null) throw new ArgumentNullException(nameof(id));
            this.id = id;
            ChangeUserName(name);
        }

        public void ChangeUserName(string name)
        {
            
            if (name == null) throw new ArgumentNullException(nameof(name));
            if (name.Length < 3) throw new ArgumentExeception("사용자명은 3글자 이상이어야 함.", nameof(name));
            
            this.name = name;
        }

        public bool Equals(User other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            // 동일성 비교는 identity인 id 값끼리 이루어진다.
            return Equals(id, other.id);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals(((User)other).id);
        }

        public override int GetHashCode()
        {
            return (id != null ? id.GetHashCode() : 0);
        }
    }
}