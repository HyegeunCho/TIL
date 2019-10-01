Shader "Custom/tex" {
	Properties {
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_MainTex2("Albedo (RGB)", 2D) = "white" {}
		_lerpTest("lerp기능 테스트", Range(0, 1)) = 0.5
		_FlowSpeed("Flow speed", float) = 1
	}
	SubShader {
		Tags { "RenderType"="Opaque" }

		CGPROGRAM
		#pragma surface surf Standard

		sampler2D _MainTex;
		sampler2D _MainTex2;
		float _lerpTest;
		float _FlowSpeed;

		struct Input {
			float2 uv_MainTex;
			float2 uv_MainTex2;
		};

		UNITY_INSTANCING_BUFFER_START(Props)
		UNITY_INSTANCING_BUFFER_END(Props)

		void surf (Input IN, inout SurfaceOutputStandard o) {
			//fixed4 c = tex2D (_MainTex, IN.uv_MainTex + _Time.y);
			//fixed4 c = tex2D(_MainTex, float2(IN.uv_MainTex.x + _Time.y, IN.uv_MainTex.y));
			fixed4 c = tex2D(_MainTex, float2(IN.uv_MainTex.x, IN.uv_MainTex.y + _Time.y * _FlowSpeed));
			fixed4 d = tex2D(_MainTex2, IN.uv_MainTex2);
			//o.Albedo = lerp(c.rgb, d.rgb, 1 - c.a);
			o.Albedo = lerp(c.rgb, d.rgb, _lerpTest - c.a);
			// 0, 100 => 0.8 =? 80
			o.Alpha = c.a;
		}
		ENDCG
	}
	FallBack "Diffuse"
}
