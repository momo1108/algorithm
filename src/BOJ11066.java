import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ11066 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int K;
    static int[] size;
    static int[][] sum;
    static StringBuilder sb = new StringBuilder();

    // 입력 함수
    static void input(){
        K = fr.nextInt();
        size = new int[K+1];
        sum = new int[K+1][K+1];

        for (int i = 1; i <= K; i++) {
            size[i] = fr.nextInt();
            // 점화식에 필요한 파일 크기 합 저장
            sum[i][i] = size[i];
            for (int j = 1; j < i; j++) {
                sum[j][i] = sum[j][i - 1] + size[i];
            }
        }
    }

    static void dp(){
        int[][] Dy = new int[K+1][K+1];

        // 구간의 길이가 2인 위치부터 채워넣자.
        for(int len = 2; len <= K; len++){
            for(int start = 1; start + len <= K + 1; start++){
                // 점화식 구현
                int partition_sum = 999999999;
                int end = start + len - 1;
                for(int section_start = end; section_start > start; section_start--){
                    partition_sum = Math.min(partition_sum, Dy[start][section_start - 1] + Dy[section_start][end] + sum[start][end]);
                }
                Dy[start][end] = partition_sum;
            }
        }

        sb.append(Dy[1][K]).append('\n');
    }

    public static void main(String[] args) throws Exception {
        int T = fr.nextInt();
        while (T-- > 0) {
            input();
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