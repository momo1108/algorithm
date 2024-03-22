import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ1260 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static StringBuilder sb = new StringBuilder();
    static int N, M, V;
    static int[][] adj1;
    static ArrayList<Integer>[] adj2;
    static boolean[] visit;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        V = fr.nextInt();
        visit = new boolean[N + 1];
        adj1 = new int[N + 1][N + 1];
        adj2 = new ArrayList[N + 1];
        for (int i = 1; i <= N; i++) {
            adj2[i] = new ArrayList<Integer>();
        }

        int x, y;
        for (int i = 0; i < M; i++) {
            x = fr.nextInt();
            y = fr.nextInt();
            adj1[x][y] = 1;
            adj1[y][x] = 1;
            adj2[x].add(y);
            adj2[y].add(x);
        }

        // 문제에서 요구하는 작은 정점부터 탐색을 위한 정렬
        for (int i = 1; i <= N; i++) {
            Collections.sort(adj2[i]);
        }
    }

    static void dfs(int V){
        sb.append(V).append(' ');
        visit[V] = true;

        for (int i = 1; i <= N; i++) {
            if(visit[i]) continue;
            if(adj1[V][i] == 1) dfs(i);
        }
    }

    static void bfs(int V){
        Queue<Integer> queue = new LinkedList<>();
        queue.add(V);
        visit[V] = true;

        while(!queue.isEmpty()){
            int x = queue.poll();
            sb.append(x).append(' ');

            for (int i = 1; i <= N; i++) {
                if(visit[i]) continue;
                if(adj1[x][i] == 1) {
                    queue.add(i);
                    visit[i] = true;
                }
            }
        }
    }

    static void dfs2(int V){
        sb.append(V).append(' ');
        visit[V] = true;

        for (int i : adj2[V]) {
            if(visit[i]) continue;
            dfs2(i);
        }
    }

    static void bfs2(int V){
        Queue<Integer> queue = new LinkedList<>();
        queue.add(V);
        visit[V] = true;

        while(!queue.isEmpty()){
            int x = queue.poll();
            sb.append(x).append(' ');

            for (int i : adj2[x]) {
                if(visit[i]) continue;
                queue.add(i);
                visit[i] = true;
            }
        }
    }

    static void pro(){
        visit = new boolean[N + 1];
        dfs2(V);
        sb.append('\n');
        visit = new boolean[N + 1];
        bfs2(V);

        System.out.println(sb);
    }

    public static void main(String[] args) throws Exception {
        input();
        pro();
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