import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ1949 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] pop;
    static ArrayList<Integer>[] tree;
    static int[][] Dy;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        
        pop = new int[N + 1];
        tree = new ArrayList[N+1];
        Dy = new int[N+1][2];

        for (int i = 1; i <= N; i++) {
            pop[i] = fr.nextInt();
            tree[i] = new ArrayList<>();
        }

        int start, end;
        for (int i = 0; i < N - 1; i++) {
            start = fr.nextInt();
            end = fr.nextInt();
            tree[start].add(end);
            tree[end].add(start);
        }
    }

    static void dfs(int subroot, int parent){
        Dy[subroot][0] = 0;
        Dy[subroot][1] = pop[subroot];

        for(int child : tree[subroot]){
            if(parent == child) continue;
            dfs(child, subroot);
            Dy[subroot][0] += Math.max(Dy[child][0], Dy[child][1]);
            Dy[subroot][1] += Dy[child][0];
        }
    }

    static void dp(){
        // Root 는 편의상 1로 설정한다.
        // Dy[i][0] : i 노드 선택 안한 subtree 의 최대 우수 마을 인원수
        // Dy[i][1] : i 노드 선택한 subtree 의 최대 우수 마을 인원수
        dfs(1, 0);
        System.out.println(Math.max(Dy[1][0], Dy[1][1]));
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