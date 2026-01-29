import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ11052 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] Dy = new int[10001];
    static int[] P = new int[10001];

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        for (int i = 1; i <= N; i++) {
            P[i] = fr.nextInt();
            Dy[i] = P[i];
        }
    }

    static void dp(){
        // Dy[i] : i 장을 살때 최대값
        // 초기값 : Dy[i] = P[i];
        // - i 보다 작은 종류 카드팩을 차례대로 선택
        // - 각각의 경우에 대해 가격 계산후 최대값 저장
        // 점화식 : Dy[i] = max(Dy[1]+Dy[i-1], Dy[2]+Dy[i-2], .... Dy[i]+Dy[0])

        for(int i = 2; i <= N; i++){
            for(int j = 1; j <= i / 2; j++){
                Dy[i] = Math.max(Dy[i-j] + Dy[j], Dy[i]);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        dp();

        System.out.println(Dy[N]);
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