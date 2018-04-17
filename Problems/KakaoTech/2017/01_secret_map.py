# -*- coding: utf-8 -*-

# http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/
'''
<비밀 지도 (하)>
네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다. 
그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다. 
다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.

1. 지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 “공백”(“ “) 또는 “벽”(“#”) 두 종류로 이루어져 있다.

2. 전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 “지도 1”과 “지도 2”라고 하자. 
지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다. 
지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.

3. “지도 1”과 “지도 2”는 각각 정수 배열로 암호화되어 있다.

4. 암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.

입력으로 지도의 한변 크기 n과 2개의 정수 배열 arr1, arr2가 들어온다.
 - 1 <= n <= 16
 - arr1, arr2는 길이 n인 정수 배열로 주어진다.
 - 정수 배열의 각 원소 x를 이진수로 변환했을 떄의 길이는 n 이하이다. 즉 0 <= x <= 2 ^ n - 1 을 만족한다.

'''

class SecretMap:
    def __init__(self, inN, inMap1, inMap2):
        if inN < 1 or inN > 16:
            raise Error("ElementCount: invalid size")
        self.elementCount = inN

        if isinstance(inMap1, list) is False:
            raise Error("map1: is not map")
        if len(inMap1) < self.elementCount:
            raise Error("map1: invalid size")
        self.map1 = inMap1

        if isinstance(inMap2, list) is False:
            raise Error("map2: is not map")
        if len(inMap2) < self.elementCount:
            raise Error("map2: invalid size")
        self.map2 = inMap2

    def toString(self):
        resultString = "n:     {}\nmap1:  {}\nmap2:  {}\nresult:{}".format(self.elementCount, self.map1, self.map2, self.parseMap(self.decryptMap()))
        print(resultString)
        return resultString

    def decryptMap(self):
        resultMap = []
        for index in range(self.elementCount):
            resultMap.append(self.map1[index] | self.map2[index])
        return resultMap

    def parseMap(self, inMap):
        if len(inMap) < self.elementCount:
            raise Error("inMap: invalid size")

        parsedMap = []
        for i in range(self.elementCount):
            targetValue = inMap[i]
            parsedRow = ""
            for j in reversed(range(self.elementCount)):
                if targetValue & (1 << j) > 0:
                    parsedRow = parsedRow + "#"
                else:
                    parsedRow = parsedRow + " "
            parsedMap.append(parsedRow)

        return parsedMap

secret1 = SecretMap(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28])
print("[SECRET1]")
secret1.toString()

print("\n\n")
secret2 = SecretMap(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10])
print("[SECRET2]")
secret2.toString()




