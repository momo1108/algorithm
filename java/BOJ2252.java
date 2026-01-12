import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ2252 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[] indegree;
    static ArrayList<Integer>[] dag;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        indegree = new int[N+1];
        dag = new ArrayList[N+1];

        for (int i = 0; i <= N; i++) {
            dag[i] = new ArrayList<>();
        }

        int front, behind;
        for (int i = 0; i < M; i++) {
            front = fr.nextInt();
            behind = fr.nextInt();
            dag[front].add(behind);
            indegree[behind]++;
        }
    }

    static void ts(){
        Queue<Integer> queue = new LinkedList<>();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < N; i++) {
            if(indegree[i+1] == 0) queue.add(i+1);
        }

        while (!queue.isEmpty()) {
            int v = queue.poll();
            sb.append(v).append(' ');

            for(Integer next : dag[v]){
                if(--indegree[next] == 0) queue.add(next);
            }
        }

        System.out.println(sb);
    }

    public static void main(String[] args) throws Exception {
        input();
        ts();
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