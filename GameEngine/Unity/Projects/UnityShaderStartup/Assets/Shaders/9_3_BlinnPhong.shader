Shader "Custom/9_3_BlinnPhong" {
	Properties {
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_SpecColor("Specular Color", color) = (1, 1, 1, 1)
	}
	SubShader {
		Tags { "RenderType"="Opaque" }

		CGPROGRAM
		#pragma surface surf BlinnPhong 

		#pragma target 3.0

		sampler2D _MainTex;

		struct Input {
			float2 uv_MainTex;
		};


		UNITY_INSTANCING_BUFFER_START(Props)
		UNITY_INSTANCING_BUFFER_END(Props)

		void surf (Input IN, inout SurfaceOutput o) {
			fixed4 c = tex2D (_MainTex, IN.uv_MainTex);
			o.Albedo = c.rgb;
			o.Specular = 0.5;
			o.Gloss = 1;
			o.Alpha = c.a;
		}
		ENDCG
	}
	FallBack "Diffuse"
}
