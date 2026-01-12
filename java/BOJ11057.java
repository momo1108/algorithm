import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ11057 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[][] Dy;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        Dy = new int[N+1][10];
    }

    static void dp(){
        // Dy[i][0~9]: i번 자리가 0~9 일때 오르막수 개수
        // 초기값 Dy[1][0~9] = 1;
        for (int i = 0; i < 10; i++) {
            Dy[1][i] = 1;
        }

        for (int i = 2; i <= N; i++) {
            for (int j = 0; j < 10; j++) {
                // 점화식: Dy[i][j]=sum(Dy[i-1][0~j])
                for (int k = 0; k <= j; k++) {
                    Dy[i][j] += Dy[i-1][k];
                }
                Dy[i][j] %= 10007; // 10배 해봤자 안크니까 k 반복문 밖에서 실행
            }
        }

        int answer = 0;
        for(int i = 0; i < 10; i++) answer += Dy[N][i];
        System.out.println(answer % 10007);
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