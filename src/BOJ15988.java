import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ15988 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int T;
    static long[] Dy;
    static StringBuilder sb = new StringBuilder();

    static void dp(int max){
        // 1차원 배열
        Dy = new long[1000001];

        // Dy[i] : 숫자 i 를 1,2,3 으로 표현하는 경우
        // 초기값 : Dy[1] = 1, Dy[2] = 2, Dy[3] = 4
        Dy[1] = 1;
        Dy[2] = 2;
        Dy[3] = 4;

        for(int i = 4; i <= max; i++){
            Dy[i] = (Dy[i - 1] + Dy[i - 2] + Dy[i - 3]) % 1000000009; // 3으로 시작하는 경우
        }
    }

    public static void main(String[] args) throws Exception {
        T = fr.nextInt();
        int[] Ns = new int[T];
        int max = 0;

        for (int i = 0; i < T; i++) {
            Ns[i] = fr.nextInt();
            max = Math.max(max, Ns[i]);
        }
        
        dp(max);

        for (int i = 0; i < T; i++) {
            sb.append(Dy[Ns[i]]).append('\n');
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