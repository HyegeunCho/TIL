# Theta*: Any-Angle Path Planning for Smoother Trajectories in Continuous Environments

길 찾기 알고리즘 A* 알고리즘을 개선하여 더욱 직각이동이 아니라 더욱 자연스럽게 이동 (대각선 이동)할 수 있도록 길찾기를 해주는 알고리즘

[논문 보러가기](http://aigamedev.com/open/tutorials/theta-star-any-angle-paths/)

## 용어 정리 

V : set of all grid vertices

S_start : start vertex of the search

S_goal : goal vertex

c(s, s') : straight line distance between vertices s and s'

lineofsight(s, s') : true if and only if they have line-of-sight

nghbr_vis(s) : set of neighbors of vertex s in V that have line-of -sight to s

h(s) : h-values that approximate the goal distances of the vertices s in V to focus its search.

<A*는 모든 버텍스 s에 대해 g 값과 parent 값을 보유하고 유지한다.>
g(s) : length of the shortest path from the start vertex to s found so far

parent(s) : used to extract the path after the search halts. : 
실제로 패스를 완성한 뒤, 스타트 버텍스는 바로 다음 이동해야할 버텍스의 부모 버텍스가 된다. 즉, 실제로 찾아낸 길을 완성할 때에는 골 버텍스에서 부모를 따라 스타트 버텍스까지 이동하는 방식이다.

<A*는 2개의 글로벌 데이터 구조를 갖는다.>
The open list is a priority queue that contains the vertices to be considered for expansion
길을 확장해 나갈때 (다음 진행 할 길을 찾을 때 우선 고려해야할 버텍스 정보들)

The closed list contains the vertices that have already been expanded


line-of-sight : 두 버텍스를 직선으로 연결했을 때, 블럭된 그리드에 막히지 않았다면 line-of-sight 상태라 한다.



[Theta*]
세타* 알고리즘이 에이* 알고리즘과 차별되는 점은 버텍스의 부모 버텍스로 모든 버텍스가 고려된다는 점이다. 
에이* 알고리즘은 visible neighbor만 부모로 간주한다.

h(s) = c(s, s_goal)

Path1 :
	As done by A*, Theta* considers the g(s) and c(s, s'), resulting in a length of g(s) + c(s, s')

Path2 :
	To allow for any-angle paths, 
	Theta* also considers the g(parent(s)) and c(parent(s), s'), resulting in a length of g(parent(s)) + c(parent(s), s') if s' has line-of-sight to parent(s)


[Figure6]
1. Figure6 where B3 (with parent A4) gets expanded.
2. B2 is an unexpanded visible neighbor of B3 which does not have line-of-sight to A4 and thus is updated according to Path 1(right)
3. C3 is an unexpanded visible neighbor of B3 which does have line-of-sight to A4 and thus is updated according to Path 2(left)

## 실제 프로젝트 내에서의 구현

유니티 에셋스토어의 Ultimate Isometric Toolkit의 A*알고리즘 구현을 약간 수정하였다.

수정한 부분만 게시함.

아래는 실제로 A* 검색 알고리즘이 동작하는 Astar.cs 파일의 수정된 부분이다.

```csharp
// Ultimate Isometric Toolkit
// Astar.cs - Search function
private void Search(INode node) 
{
	// SKIP
    var parentState = state.Previous;
    if (_gridGraph.LineOfSightWithoutRayCast(parentState.Node.Position, nextNode.Position) == true)
    {
    	if (parentState.Cost + Vector3.Distance(nextNode.position, parentState.Node.Position) < NodeToState[nextNode].Cost)
        {
        	NodeToState[nextNode].Previous = parentState;
        }
    }
    else 
    {
    	if (state.Cost + Vector3.Distance(nextNode.Position, node.Position) < NodeToState[nextNode].Cost)
        {
        	NodeToState[nextNode].Previous = state;
        }
    }
}
```

아래는 theta* 알고리즘에서 중요한 LineOfSight 함수 구현 부분이다.
Raycast를 사용하는 부분도 만들었으나,, Raycast는 메인스레드에서만 사용할 수 있어서 좌표계산만 하는 로직으로 바꿨다.

```c#
// GridGraph.cs

private List<Vector3> GetRaycastedCandidates(Vector3 inFrom, Vector3 inTo)
{
	List<Vector3> candidates = new List<Vector3>();
        
	int countX = (int)(Mathf.Abs(inTo.x - inFrom.x) / GizmoSize) + 1;
	int countZ = (int)(Mathf.Abs(inTo.z - inFrom.z) / GizmoSize) + 1;

	// From -> To
	float offsetX = (inTo.x - inFrom.x) > 0 ? GizmoSize : -1 * GizmoSize;
	float offsetZ = (inTo.z - inFrom.z) > 0 ? GizmoSize : -1 * GizmoSize;

	if (countX <= 1)
	{
		for (int idZ = countZ - 1; idZ >= 0; idZ--)
		{
			Vector3 willCandidate = new Vector3(inFrom.x, 0, inFrom.z + offsetZ * idZ);
			if (candidates.Contains(willCandidate) == false)
			{
				candidates.Add(willCandidate);
			}
		}
	}
	else if (countZ <= 1)
	{
		for (int idX = countX - 1; idX >= 0; idX--)
		{
			Vector3 willCandidate = new Vector3(inFrom.x + offsetX * idX, 0, inFrom.z);
			if (candidates.Contains(willCandidate) == false)
			{
				candidates.Add(willCandidate);	
			}
		}
	}
	else
	{
		for (int idX = countX - 1; idX >= 0; idX--)
		{
			for (int idZ = countZ - 1; idZ >= 0; idZ--)
			{
				Vector3 willCandidate = new Vector3(inFrom.x + offsetX * idX, 0, inFrom.z + offsetZ * idZ);
				if (candidates.Contains(willCandidate) == false)
				{
					candidates.Add(willCandidate);
				}
			}
		}
	}
	return candidates;
}

private bool IsRaycastLineCrossNode(Vector3 inFrom, Vector3 inTo, Vector3 targetNodeCenter)
{
	for (float idX = (int)(targetNodeCenter.x - (GizmoSize / 2)); idX <= (targetNodeCenter.x + (GizmoSize / 2)); idX++ )
	{
		float willZ = ((inTo.z - inFrom.z) / (inTo.x - inFrom.x)) * (idX - inFrom.x) + inFrom.z;

		if (willZ >= targetNodeCenter.z - (GizmoSize / 2) && willZ <= targetNodeCenter.z + (GizmoSize / 2))
		{
			return true;
		}
	}
	return false;
}

public bool LineOfSightWithoutRaycast(Vector3 from, Vector3 to)
{
    if (from == Vector3.zero)
    {
        from = LOSFrom;
    }

    if (to == Vector3.zero)
    {
        to = LOSTo;
    }

    Vector3 direction = to - from;
    List<Vector3> candidates = GetRaycastedCandidates(from, to);

    candidates.Remove(from);
    candidates.Remove(to);

    List<Vector3> shouldIgnoreList = new List<Vector3>();
    Array gridCoords = _gridGraph.Keys.ToArray();
    foreach (Vector3 tempCandidate in candidates)
    {
        Vector2 tempCoord = new Vector2(tempCandidate.x, tempCandidate.z);
        if (Array.IndexOf(gridCoords, tempCoord) < 0)
        {
            shouldIgnoreList.Add(tempCandidate);
        }
    }

    if (shouldIgnoreList.Count <= 0)
    {
        return true;
    }

    foreach (Vector3 tempCandidate in shouldIgnoreList)
    {
        if (IsRaycastLineCrossNode(from, to, tempCandidate) == true)
        {
            return false;
        }
    }
    return true;
}
        
public bool LineOfSight(Vector3 from, Vector3 to)
{
    if (from == Vector3.zero)
    {
        from = LOSFrom;
    }

    if (to == Vector3.zero)
    {
        to = LOSTo;
    }

    Vector3 direction = to - from;
    RaycastHit[] hits = Physics.RaycastAll(from, Vector3.Normalize(direction));

    // make candidate list
    List<Vector3> candidates = GetRaycastedCandidates(from, to);

    // get raycast hits list
    if (hits.Length <= 0)
    {
        Debug.LogError("no raycasted list");
        return false;
    }

    // get un-raycasted nodes from candidate list
    foreach (RaycastHit hit in hits)
    {
        if (candidates.Contains(hit.collider.transform.position))
        {
            candidates.Remove(hit.collider.transform.position);
        }
    }

    // remove start node and enabled (opened) node
    candidates.Remove(from);
    candidates.Remove(to);

    List<Vector3> shouldIgnoreList = new List<Vector3>();
    Array gridCoords = _gridGraph.Keys.ToArray();
    foreach (Vector3 tempCandidate in candidates)
    {
        Vector2 tempCoord = new Vector2(tempCandidate.x, tempCandidate.z);
        if (Array.IndexOf(gridCoords, tempCoord) < 0)
        {
            shouldIgnoreList.Add(tempCandidate);
        }
    }

    if (shouldIgnoreList.Count <=  0)
    {
        return true;
    }

    foreach (Vector3 tempCandidate in shouldIgnoreList)
    {
        if (IsRaycastLineCrossNode(from, to, tempCandidate) == true)
        {
            return false;
        }
    }
    return true;
}
```