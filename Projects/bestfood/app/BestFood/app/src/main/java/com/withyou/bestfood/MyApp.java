package com.withyou.bestfood;

import android.app.Application;
import android.content.RestrictionEntry;
import android.os.StrictMode;

import com.withyou.bestfood.item.FoodInfoItem;
import com.withyou.bestfood.item.MemberInfoItem;

/**
 * Created by hgcho on 2017. 10. 17..
 *
 * Application 클래스는 애플리케이션의 상태를 저장하고 이를 어디서나 호출해서 사용할 수 있도록 해 주는 클래스다.
 * MyApp 클래스처럼 Application 클래스를 상속해서 원하는 방식으로 사용할 수 있다.
 *
 * 여기서는 사용자 정보인 MemberInfoItem을 저장하고 반환하는 역할을 한다.
 * 이를 통해 앱의 어디서나 사용자 정보에 접근할 수 있다.
 *
 * Application 클래스는 애플리케이션이 시작할 때 다른 클래스보다 먼저 초기화되며,
 * 이렇게 동작하게 하기 위해서는 AndroidManifest.xml의 application 태그의 android:name 속성에 MyApp 클래스명을 지정해야 한다.
 *
 * 이제 애플리케이션 어디에서든지
 * ((MyApp) getApplicationContext()).XXXX() 으로 MyApp 클래스에 접근할 수 있다.
 */

public class MyApp extends Application
{
    private MemberInfoItem memberInfoItem;
    private FoodInfoItem foodInfoItem;

    @Override
    public void onCreate()
    {
        super.onCreate();

        // FileUriExposedException 문제를 해결하기 위한 코드
        // 관련 설명은 책의 [부록](335페이지 참고
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
    }


    public MemberInfoItem getMemberInfoItem()
    {
        if (memberInfoItem == null)
        {
            memberInfoItem = new MemberInfoItem();
        }

        return memberInfoItem;
    }


    public void setMemberInfoItem(MemberInfoItem item)
    {
        this.memberInfoItem = item;
    }


    public int getMemberSeq()
    {
        return memberInfoItem.seq;
    }


    public void setFoodInfoItem(FoodInfoItem foodInfoItem)
    {
        this.foodInfoItem = foodInfoItem;
    }


    public FoodInfoItem getFoodInfoItem()
    {
        return foodInfoItem;
    }
}
