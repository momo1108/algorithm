import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ15650 {
    // https://www.acmicpc.net/problem/15650

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[] selected;
    static StringBuilder sb = new StringBuilder();

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        selected = new int[M+1];
    }

    // 재귀함수 설계
    static void rec(int k){
        if(k > M){
            for(int index = 1; index < selected.length; index++){
                sb.append(selected[index] + " ");
            }
            sb.append('\n');
        } else {
            int start = k == 1 ? 1 : selected[k-1] + 1;
            for(int num = start; num <= N; num++){
                selected[k] = num;
                rec(k+1);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        rec(1);

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