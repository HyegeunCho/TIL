

namespace Chapter2
{
    /// <summary>
    /// List 2-4
    /// </summary>
    public class FullName : IEquatable<FullName>
    {
        private readonly Name firstName;
        private readonly Name lastName;
        public string FirstName { get; }
        public string LastName { get; }

        public FullName(string firstName, string lastName) 
        {
            FirstName = firstName;
            LastName = lastName;
        }

        // 값 객체 자체에서 Equals를 구현하여 서로 등가성 비교할 수 있다면
        // 값 객체의 속성이 추가되거나 삭제되더라도 값 객체 클래스만 수정하면 된다.
        public bool Equals(FullName other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return string.Equals(FirstName, other.FirstName)
                && string.Equals(LastName, other.LastName);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((FullName) obj);
        }

        // C#에서 Equals를 오버라이드 하려면 GetHashCode를 함께 오버라이드 히야 한다.
        public override int GetHashCode()
        {
            unchecked
            {
                return ((FirstName != null ? FirstName.GetHashCode() : 0) * 397)
                    ^ (LastName != null ? LastName.GetHashCode() : 0);
            }
        }
    }
}