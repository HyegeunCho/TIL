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

체이닝된 코루틴에서도 `OnNext`와 `OnComplete`를 사용하기 위해서는 이후에 실행할 코루틴 역시 `Observable.FromCoroutine<int>`로 감싸줄 필요가 있다.
그런 경우에는 아예 아래와 같이 변경한 `Observable`을 미리 저장해뒀다가 체이닝하는 것도 잘 동작하는 것 같다.
여전히 좀 더 깔끔하게 사용할 수 있는 방법은 고민해봐야 겠다.

```c#
void Start()
{
    IObservable<int> OBS_WaitingTask= Observable.FromCoroutine<int>(observer => Co_WaitingTask(observer));
    IObservable<int> OBS_DidTask = Observable.FromCoroutine<int>(observer => Co_DidTask(observer));

    OBS_WaitingTask
        .SelectMany(inStream => OBS_DidTask)
        .Subscribe(() =>
        {
            TXT_Progress.text = "THE END!";
        });
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

IEnumerator Co_DidTask(IObserver<int> observer)
{
    TXT_Progress.text = "Did Waiting Task";
    yield return new WaitForSeconds(3);
    TXT_Progress.text = "OnNext";
    observer.OnNext(1);
    observer.OnComplete();
}
```

그런데 위와 같은 방식으로 스트림을 연결할 경우, 스트림을 통해 전달되는 int 데이터를 받는 부분이 없다.
이런 경우엔 아래처럼 람다에 명시적으로 데이터를 넘겨주는 방식을 써야 한다.

```c#
void Start()
{

    Observable.FromCoroutine<int>(observer => Co_WaitingTask(observer))
        .SelectMany(inStream => {
            return Observable.FromCoroutine<int>(observer => Co_DidTask(inStream, observer));
        })
        .Subscribe(() => 
        {
            TXT_Progress.text = "THE END!";
        });
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

IEnumerator Co_DidTask(int inStream, IObserver<int> observer)
{
    TXT_Progress.text = String.Format("Did Waiting Task: {0}", inStream);
    yield return new WaitForSeconds(3);
    TXT_Progress.text = "OnNext";
    observer.OnNext(inStream + 1);
    observer.OnComplete();
}
```
