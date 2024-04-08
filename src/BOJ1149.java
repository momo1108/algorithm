import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ1149 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[][] Dy, cost;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        Dy = new int[N+1][3];
        cost = new int[N+1][3];

        for (int i = 1; i <= N; i++) {
            cost[i][0] = fr.nextInt();
            cost[i][1] = fr.nextInt();
            cost[i][2] = fr.nextInt();
        }
    }

    static void dp(){
        Dy[1][0] = cost[1][0];
        Dy[1][1] = cost[1][1];
        Dy[1][2] = cost[1][2];

        for (int i = 2; i <= N; i++) {
            Dy[i][0] = Math.min(Dy[i-1][1], Dy[i-1][2]) + cost[i][0];
            Dy[i][1] = Math.min(Dy[i-1][0], Dy[i-1][2]) + cost[i][1];
            Dy[i][2] = Math.min(Dy[i-1][0], Dy[i-1][1]) + cost[i][2];
        }

        Arrays.sort(Dy[N]);
        System.out.println(Dy[N][0]);
    }

    public static void main(String[] args) throws Exception {
        input();
        dp();
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