class Party
{
    public const int CostOfFoodPerPerson = 25;
    public int NumberOfPeople { get; set; }
    public bool FancyDecorations { get; set; }

    private decimal CalculateCostOfDecorations()
    {
        decimal costOfDecorations;
        if (FancyDecorations)
        {
            costOfDecorations = (NumberOfPeople * 15.00M) + 50M;
        }
        else
        {
            costOfDecorations = (NumberOfPeople * 7.5M) + 30M;
        }
        return costOfDecorations;
    }

    public virtual decimal Cost
    {
        get 
        {
            decimal totalCost = CalculateCostOfDecorations();
            totalCost += CostOfFoodPerPerson * NumberOfPeople;
            if (NumberOfPeople > 12)
            {
                totalCost += 100;
            }
            return totalCost;
        }
    }
}