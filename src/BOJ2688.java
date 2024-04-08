import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2688 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static StringBuilder sb = new StringBuilder();
    static long[][] Dy;

    static void dp(){
        int n = fr.nextInt();

        Dy = new long[n+1][10];

        for(int i = 0; i < 10; i++) Dy[1][i] = 1;

        for(int i = 2; i <= n; i++){
            for (int j = 0; j < 10; j++) {
                for (int k = 0; k <= j; k++) {
                    Dy[i][j] += Dy[i-1][k];
                }
            }
        }

        long answer = 0;
        for(long a : Dy[n])answer += a;
        sb.append(answer).append('\n');
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