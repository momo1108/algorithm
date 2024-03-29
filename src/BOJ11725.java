import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ11725 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] P;
    static boolean[] visit;
    static ArrayList<Integer>[] edge;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        P = new int[N+1];
        visit = new boolean[N+1];
        edge = new ArrayList[N+1];

        for (int i = 1; i <= N; i++) {
            edge[i] = new ArrayList<>();
        }

        int start, end;
        for (int i = 0; i < N-1; i++) {
            start = fr.nextInt();
            end = fr.nextInt();
            edge[start].add(end);
            edge[end].add(start);
        }
    }

    static void tree(int node){
        visit[node] = true;
        for(Integer n : edge[node]){
            if(visit[n]) continue;
            P[n] = node;
            tree(n);
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        tree(1);

        StringBuilder sb = new StringBuilder();
        for (int i = 2; i <= N; i++) {
            sb.append(P[i]).append('\n');
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