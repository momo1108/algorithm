import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ15651 {
    // 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
    // 1부터 N까지 자연수 중에서 M개를 고른 수열
    // 같은 수를 여러 번 골라도 된다.
    // https://www.acmicpc.net/problem/15651

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
            for(int num = 1; num <= N; num++){
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