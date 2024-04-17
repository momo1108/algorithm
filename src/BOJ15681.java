import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ15681 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, R, Q;
    static int[] Dy;
    static int[] U;
    static ArrayList<Integer>[] tree;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        R = fr.nextInt();
        Q = fr.nextInt();

        tree = new ArrayList[N+1];
        Dy = new int[N + 1];
        U = new int[Q];

        for (int i = 1; i <= N; i++) {
            tree[i] = new ArrayList<>();
        }

        int start, end;
        for (int i = 0; i < N - 1; i++) {
            start = fr.nextInt();
            end = fr.nextInt();
            tree[start].add(end);
            tree[end].add(start);
        }

        for (int i = 0; i < Q; i++) {
            U[i] = fr.nextInt();
        }
    }

    static int dfs(int subroot, int parent){
        Dy[subroot] = 1;

        for(Integer child : tree[subroot]){
            if(child == parent) continue;
            Dy[subroot] += dfs(child, subroot);
        }
        return Dy[subroot];
    }

    static void dp(){
        dfs(R, 0);

        StringBuilder sb = new StringBuilder();
        for(int subroot : U){
            sb.append(Dy[subroot]).append('\n');
        }
        System.out.println(sb);
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