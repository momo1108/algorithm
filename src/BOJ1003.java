import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1003 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static long Dy[][];
    static StringBuilder sb = new StringBuilder();

    // 입력 함수
    static void dp(){
        int N = fr.nextInt();

        Dy = new long[41][2];

        // Dy[i] : fibonacci(i) 호출 시 0과 1 출력 회수
        // 점화식 : Dy[i] = Dy[i-1] + Dy[i-2];
        Dy[0][0] = 1;
        Dy[0][1] = 0;
        Dy[1][0] = 0;
        Dy[1][1] = 1;

        for (int i = 2; i <= N; i++) {
            Dy[i][0] = Dy[i-1][0] + Dy[i-2][0];
            Dy[i][1] = Dy[i-1][1] + Dy[i-2][1];
        }

        sb.append(Dy[N][0]).append(' ').append(Dy[N][1]).append('\n');
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