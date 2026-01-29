import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ9465 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static StringBuilder sb = new StringBuilder();

    // 입력 함수
    static void dp(){
        int n = fr.nextInt();
        int[][] score = new int[2][n+1];
        int[][] dy = new int[n+1][3];

        for (int i = 1; i <= n; i++) score[0][i] = fr.nextInt();
        for (int i = 1; i <= n; i++) score[1][i] = fr.nextInt();

        dy[1][0] = score[0][1];
        dy[1][1] = score[1][1];
        dy[1][2] = 0;

        for (int i = 2; i <= n; i++) {
            dy[i][0] = Math.max(dy[i-1][1], dy[i-1][2]) + score[0][i];
            dy[i][1] = Math.max(dy[i-1][0], dy[i-1][2]) + score[1][i];
            dy[i][2] = Math.max(Math.max(dy[i-1][0], dy[i-1][1]), dy[i-1][2]);
        }

        sb.append(Math.max(Math.max(dy[n][0], dy[n][1]), dy[n][2])).append('\n');
    }

    public static void main(String[] args) throws Exception {
        int T = fr.nextInt();
        while(T-- > 0){
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