import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1562 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();

    // 입력 함수
    static void dp(){
        int N = fr.nextInt();
        long share = 1000000000;
        // 자리수, 마지막 숫자, 최소값, 최대값
        long[][][][] Dy = new long[N+1][10][10][10];

        for (int i = 1; i < 10; i++) Dy[1][i][i][i] = 1;

        for (int len = 2; len <= N; len++) {
            for (int prev = 0; prev < 10; prev++) {
                for (int min = 0; min < 10; min++) {
                    for (int max = min; max < 10; max++) {
                        if(prev - 1 >= 0) {
                            Dy[len][prev - 1][Math.min(prev - 1, min)][max] += Dy[len - 1][prev][min][max];
                            Dy[len][prev - 1][Math.min(prev - 1, min)][max] %= share;
                        }
                        if(prev + 1 < 10) {
                            Dy[len][prev + 1][min][Math.max(prev + 1, max)] += Dy[len - 1][prev][min][max];
                            Dy[len][prev + 1][min][Math.max(prev + 1, max)] %= share;
                        }
                        
                    }
                }
            }
        }

        long answer = 0;
        for (int i = 0; i < 10; i++) {
            answer += Dy[N][i][0][9];
        }
        System.out.println(answer % share);
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