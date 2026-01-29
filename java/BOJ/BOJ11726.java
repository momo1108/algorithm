import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ11726 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int n;
    static int[] Dy;

    // 입력 함수
    static void dp(){
        n = fr.nextInt();
        Dy = new int[1001];

        // Dy[i] = 2*i 직사각형을 채우는 경우의 수
        // 초기값 Dy[1] = 1, Dy[2] = 2
        // 점화식 : 가장 왼쪽이 1*2 1개 혹은 2*1 2개 인 경우
        // Dy[i] = Dy[i-1] + Dy[i-2];
        Dy[1] = 1;
        Dy[2] = 2;

        for(int i = 3; i <= n; i++){
            Dy[i] = (Dy[i-1] + Dy[i-2]) % 10007;
        }

        System.out.println(Dy[n]);
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