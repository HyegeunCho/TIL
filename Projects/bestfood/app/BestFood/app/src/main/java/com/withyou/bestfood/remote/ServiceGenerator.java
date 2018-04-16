package com.withyou.bestfood.remote;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.withyou.bestfood.BuildConfig;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by hgcho on 2017. 10. 17..
 *
 * 원격 서버와 통신할 수 있게 해 주는 레트로핏과 관련된 설정을 하는 클래스.
 *
 * createService() 메서드를 통해 서버와 통신하기 위한 레트로핏 객체를 생성할 수 있게 해 준다.
 */

public class ServiceGenerator
{
    /**
     * 원격 호출을 정의한 인터페이스 메서드를 호출할 수 있는 서비스를 생성
     *
     * @param serviceClass 원격 호출 메서드를 정의한 인터페이스
     * @return 인터페이스 구현체
     */
    public static <S> S createService(Class<S> serviceClass)
    {
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        if (BuildConfig.DEBUG)
        {
            logging.setLevel(HttpLoggingInterceptor.Level.BODY);
        }
        else
        {
            logging.setLevel(HttpLoggingInterceptor.Level.NONE);
        }

        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(logging);

        Gson gson = new GsonBuilder().setLenient().create();

        Retrofit retrofit = new Retrofit.Builder().baseUrl(RemoteService.BASE_URL).addConverterFactory(GsonConverterFactory.create(gson)).client(httpClient.build()).build();

        return retrofit.create(serviceClass);
    }
}
