import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1309 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();

    // 입력 함수
    static void dp(){
        int N = fr.nextInt();
        int[][] Dy = new int[N+1][3];
        // 각각의 행의 배치에 대해 3가지 파티션
        // 0 - 배치 안함, 1 - 첫번째 열, 2 - 두번째 열
        // 첫번째 열에는 모두 가능 = 1가지 경우의 수
        Dy[1][0] = 1;
        Dy[1][1] = 1;
        Dy[1][2] = 1;

        for (int i = 2; i <= N; i++) {
            Dy[i][0] = (Dy[i-1][0] + Dy[i-1][1] + Dy[i-1][2]) % 9901;
            Dy[i][1] = (Dy[i-1][0] + Dy[i-1][2]) % 9901;
            Dy[i][2] = (Dy[i-1][0] + Dy[i-1][1]) % 9901;
        }

        System.out.println((Dy[N][0] + Dy[N][1] + Dy[N][2]) % 9901);
    }

    public static void main(String[] args) throws Exception {
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