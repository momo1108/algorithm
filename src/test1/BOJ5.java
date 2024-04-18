package test1;

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

public class BOJ5 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[][] map;
    // 종류(0,1,2,3,4,9)
    // 불어온 바람방향(0~3)
    // 다음 위치와 불어갈 방향
    static int[][][] windDir = new int[][][]{
        {{-1, 0, 0}, {0, 1, 1}, {1, 0, 2}, {0, -1, 3}},
        {{-1, 0, 0}, {0, -1, 3}, {1, 0, 2}, {0, 1, 1}},
        {{1, 0, 2}, {0, 1, 1}, {-1, 0, 0}, {0, -1, 3}},
        {{0, 1, 1}, {-1, 0, 0}, {0, -1, 3}, {1, 0, 2}},
        {{0, -1, 3}, {1, 0, 2}, {0, 1, 1}, {-1, 0, 0}},
        {{0, 0}, {0, 0}, {0, 0}, {0, 0}},
        {{0, 0}, {0, 0}, {0, 0}, {0, 0}},
        {{0, 0}, {0, 0}, {0, 0}, {0, 0}},
        {{0, 0}, {0, 0}, {0, 0}, {0, 0}},
        {{-1, 0, 0}, {0, 1, 1}, {1, 0, 2}, {0, -1, 3}}
    };
    static ArrayList<Integer[]> air;
    // 행, 열, 바람이 들어온 방향
    static boolean[][][] visit;

    static class Wind {
        int row, col, dir;

        public Wind(int row, int col, int dir){
            this.row = row;
            this.col = col;
            this.dir = dir;
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        map = new int[N][M];
        air = new ArrayList<>();

        // 0 : 위방향, 1: 오, 2: 아래, 3: 왼
        visit = new boolean[N][M][4];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                map[i][j] = fr.nextInt();
                if(map[i][j] == 9) air.add(new Integer[]{i, j});
            }
        }
    }

    static Wind next(Wind wind){
        int[] n = windDir[map[wind.row][wind.col]][wind.dir];

        if(wind.row + n[0] < 0 || wind.row + n[0] >= N ||
        wind.col + n[1] < 0 || wind.col + n[1] >= M ) return new Wind(-1, -1, -1);

        return new Wind(wind.row + n[0], wind.col + n[1], n[2]);
    }

    static void bfs(){
        Queue<Wind> q = new LinkedList<>();
        for(Integer[] a : air){
            for (int dir = 0; dir < 4; dir++) {
                visit[a[0]][a[1]][dir] = true;
                Wind nextWind = next(new Wind(a[0], a[1], dir));
                if(nextWind.row != -1){
                    visit[nextWind.row][nextWind.col][nextWind.dir] = true;
                    q.add(nextWind);
                }
            }
        }

        while (!q.isEmpty()) {
            Wind w = q.poll();
            Wind nextWind = next(w);
            if(nextWind.row == -1) continue;
            if(visit[nextWind.row][nextWind.col][nextWind.dir]) continue;
            
            visit[nextWind.row][nextWind.col][nextWind.dir] = true;
            q.add(nextWind);
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        bfs();

        int answer = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                for (int k = 0; k < 4; k++) {
                    if(visit[i][j][k]){
                        answer++;
                        break;
                    }
                }
            }
        }
        System.out.println(answer);
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