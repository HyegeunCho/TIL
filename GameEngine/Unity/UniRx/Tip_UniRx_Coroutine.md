UniRx를 이용해서 코루틴을 체이닝할 때, 코루틴 내부에 태스크가 있는 경우 아래와 같이 처리하면 되는 것 같다.
각 코드의 정확한 의미를 좀 더 찾아볼 것.

```c#
void Start()
{
    Observable.FromCoroutine<int>(observer => Co_WaitingTask(observer))
        .SelectMany(Co_DidTask)
        .Subscribe();
}

IEnumerator Co_WaitingTask(IObserver<int> observer)
{
    TXT_Progress.text = "Will Start Task";
    Task t = new Task(new Action(() =>
    {
        for (int i = 0; i< 10000; i++)
        {
            Debug.Log(String.Format("Delay: {0}", i));
        }
    }));
    t.ContinueWith(action => 
    {
        Debug.Log("Did Task");
        observer.OnNext(0);
        observer.OnCompleted();
    });
    t.Start();
    
    yield return null;
}

IEnumerator Co_DidTask()
{
    TXT_Progress.text = "Did Waiting Task";
    yield return new WaitForSeconds(3);
    TXT_Progress.text = "OnNext";
}
```
