package com.withyou.bestfood.lib;

import android.content.Context;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;

import com.withyou.bestfood.ProfileActivity;

/**
 * Created by hgcho on 2017. 10. 31..
 *
 * 액티비티나 프래그먼트 실행 라이브러리
 *
 * 프래그먼트 : 동작 또는 Activity 내에서 사용자 인터페이스의 일부
 * 한 액티비티의 레이아웃을 여러 프래그먼트로 나누면 런타임에 액티비티의 외관을 수정할 수도 있고
 * 그러한 변경을 해당 액티비티가 관리하는 백스택에 보존할 수도 있다.
 */

public class GoLib
{
    public final String TAG = GoLib.class.getSimpleName();
    private volatile static GoLib instance;

    public static GoLib getInstance()
    {
        if (instance == null)
        {
            synchronized (GoLib.class)
            {
                if (instance == null)
                {
                    instance = new GoLib();
                }
            }
        }
        return instance;
    }

    /**
     * 프래그먼트를 보여준다
     * @param fragmentManager 프래그먼트 매니저
     * @param containerViewId 프래그먼트를 보여줄 컨테이너 뷰 아이디
     * @param fragment 프래그먼트
     */
    public void goFragment(FragmentManager fragmentManager, int containerViewId, Fragment fragment)
    {
        fragmentManager.beginTransaction().replace(containerViewId, fragment).addToBackStack(null).commit();
    }

    /**
     * 이전 프래그먼트를 보여준다
     * @param fragmentManager 프래그먼트 매니저
     */
    public void goBackFragment(FragmentManager fragmentManager)
    {
        fragmentManager.popBackStack();
    }

    /**
     * 프로파일 액티비티를 실행한다.
     * @param context 컨텍스트
     */
    public void goProfileActivity(Context context)
    {
        Intent intent = new Intent(context, ProfileActivity.class);
        // Intent.FLAG_ACTIVITY_NEW_TASK : 액티비티 생성 시 새로운 태스크를 생성하여 해당 태스크 안에 액티비티를 추가
        // 기존에 존재하는 태스크 중 생성하려는 액티비티와 동일한 affinity를 가진 태스크가 있다면 해당 태스크에 추가된다.
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    /**
     * 맛집 정보 등록 액티비티를 실행한다.
     * @param context 컨텍스트
     */
    public void goBestFoodRegisterActivity(Context context)
    {
        Intent intent = new Intent(context, BestFoodRegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    /**
     * 맛집 정보 액티비티를 실행한다
     * @param context 컨텍스트 객체
     * @param infoSeq 맛집 정보 일련번호
     */
    public void goBestFoodInfoActivity(Context context, int infoSeq)
    {
        Intent intent = new Intent(context, BestFoodInfoActivity.class);
        intent.putExtra(BestFoodInfoActivity.INFO_SEQ, infoSeq);
        context.startActivity(intent);
    }
}


