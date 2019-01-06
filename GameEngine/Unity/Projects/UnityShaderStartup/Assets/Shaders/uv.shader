Shader "Custom/uv" {
	Properties {
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200

		CGPROGRAM
		#pragma surface surf Standard

		sampler2D _MainTex;

		struct Input {
			float2 uv_MainTex;
		};


		UNITY_INSTANCING_BUFFER_START(Props)
		UNITY_INSTANCING_BUFFER_END(Props)

		void surf (Input IN, inout SurfaceOutputStandard o) {
			fixed4 c = tex2D (_MainTex, IN.uv_MainTex);
			o.Emission = float3(IN.uv_MainTex.x, IN.uv_MainTex.y, 0);
			o.Alpha = c.a;
		}
		ENDCG
	}
	FallBack "Diffuse"
}
