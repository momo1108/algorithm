import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ15991 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static long[] Dy = new long[100001];

    // 입력 함수
    static void dp(){
        // Dy[i] : i 를 대칭으로 표현하는 경우의 수
        // 초기값 : Dy[1], Dy[2], ... , Dy[6]
        Dy[1] = 1; // 1
        Dy[2] = 2; // 2, 1 1
        Dy[3] = 2; // 3, 1 1 1
        Dy[4] = 3; // 1111, 121, 22
        Dy[5] = 3; // 11111, 131, 212
        Dy[6] = 6; // 111111, 11211, 1221, 2112, 222, 33
        
        // 양쪽이 1, 2, 3 인 경우의 수를 합산
        // 점화식 : Dy[i] = Dy[i-2] + Dy[i-4] + Dy[i-6];
        for (int i = 7; i < 100001; i++) {
            Dy[i] = (Dy[i-2] + Dy[i-4] + Dy[i-6]) % 1000000009;
        }
    }

    public static void main(String[] args) throws Exception {
        int T = fr.nextInt();
        dp();

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < T; i++) {
            int n = fr.nextInt();
            sb.append(Dy[n]).append('\n');
        }

        System.out.println(sb);
    }

    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        public FastReader(String s) throws FileNotFoundException {
            br = new BufferedReader(new FileReader(new File(s)));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }

        double nextDouble() {
            return Double.parseDouble(next());
        }

        String nextLine() {
            String str = "";
            try {
                str = br.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return str;
        }
    }
}