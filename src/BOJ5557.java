import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ5557 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, result;
    static int[] nums;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        nums = new int[N];

        for (int i = 1; i < N; i++) {
            nums[i] = fr.nextInt();
        }

        result = fr.nextInt();
    }

    static void dp(){
        long[][] Dy = new long[N][21];
        Dy[1][nums[1]] = 1;

        for (int cur = 2; cur < N; cur++) {
            for (int prevResult = 0; prevResult < 21; prevResult++) {
                if(prevResult + nums[cur] < 21) Dy[cur][prevResult + nums[cur]] += Dy[cur - 1][prevResult];
                if(prevResult - nums[cur] >= 0) Dy[cur][prevResult - nums[cur]] += Dy[cur - 1][prevResult];
            }
        }

        System.out.println(Dy[N-1][result]);
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