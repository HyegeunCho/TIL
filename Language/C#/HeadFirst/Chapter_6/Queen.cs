class Queen
{
    public Queen(Worker[] workers)
    {
        this.workers = workers;
    }

    private Worker[] workers;
    private int shiftNumber = 0;

    public bool AssignWork(string job, int numberOfShifts)
    {
        for (int i = 0; i < workers.Length; i++)
        {
            if (workers[i].DoThisJob(job, numberOfShifts))
            {
                return true;
            }
        }
        return false;
    }

    public string WorkTheNextShift()
    {
        shiftNumber++;
        string report = "Report for shift #" + shiftNumber + "\r\n";
        
    }
}