import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2156 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int n;
    static int[] wine;
    static int[][] Dy;

    // 입력 함수
    static void input(){
        n = fr.nextInt();
        Dy = new int[n+1][3];
        wine = new int[n+1];

        for (int i = 1; i <= n; i++) {
            wine[i] = fr.nextInt();
        }
    }

    static void dp(){
        int answer = 0;
        Dy[1][0] = wine[1];
        Dy[1][1] = wine[1];
        Dy[1][2] = 0;

        for (int i = 2; i <= n; i++) {
            Dy[i][2] = answer;
            Dy[i][0] = Math.max(Math.max(Dy[i-2][0], Dy[i-2][1]), Dy[i-1][2]) + wine[i];
            Dy[i][1] = Dy[i-1][0] + wine[i];
            answer = Math.max(Dy[i][0], answer);
            answer = Math.max(Dy[i][1], answer);
        }

        System.out.println(n == 1? wine[1] : answer);
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