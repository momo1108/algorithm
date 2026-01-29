import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ9095 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int T;
    static int[][] Dy;
    static int[] Dy2;
    static StringBuilder sb = new StringBuilder();

    static void dp(){
        int n = fr.nextInt();

        // 2차원 배열
        Dy = new int[n+1][4];

        // Dy[i][j] : 숫자 i 를 표현할 때 j 로 시작하는 경우의 수
        // 초기값 : Dy[1][1], Dy[1][2], Dy[1][3]
        Dy[1][1] = 1;
        Dy[1][2] = 0;
        Dy[1][3] = 0;

        for(int i = 2; i <= n; i++){
            Dy[i][1] = Dy[i-1][1] + Dy[i-1][2] + Dy[i-1][3];
            Dy[i][2] = i - 2 < 0? 0 : i - 2 == 0 ? 1 : Dy[i-2][1] + Dy[i-2][2] + Dy[i-2][3];
            Dy[i][3] = i - 3 < 0? 0 : i - 3 == 0 ? 1 : Dy[i-3][1] + Dy[i-3][2] + Dy[i-3][3];
        }

        sb.append(Dy[n][1] + Dy[n][2] + Dy[n][3]).append('\n');

        // 1차원 배열
        Dy2 = new int[n > 3 ? n+1 : 4];

        // Dy2[i] : 숫자 i 를 1,2,3 으로 표현하는 경우
        // 초기값 : Dy2[1] = 1, Dy2[2] = 2, Dy2[3] = 4
        Dy2[1] = 1;
        Dy2[2] = 2;
        Dy2[3] = 4;

        for(int i = 4; i <= n; i++){
            // 4 부터 각 수에 대해 점화식
            // : 1 or 2 or 3 으로 시작하는 경우의 수 합
            Dy2[i] += Dy2[i - 1]; // 1로 시작하는 경우
            Dy2[i] += Dy2[i - 2]; // 2로 시작하는 경우
            Dy2[i] += Dy2[i - 3]; // 3으로 시작하는 경우
        }

        sb.append(Dy2[n]).append('\n');
    }

    public static void main(String[] args) throws Exception {
        T = fr.nextInt();

        while(T-- > 0) {
            dp();
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