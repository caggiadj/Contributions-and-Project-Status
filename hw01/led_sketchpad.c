#include <stdio.h>
int px = 1, py = 1;

int main () {
  int num,dir;
  int i, j;
  printf("Enter the maximum size of the square sketchpad: ");
  scanf("%d", &num);  
  int grid[num][num];
  while(1){
    for (i = 0; i < num + 1; i++) {
      for (j = 0; j < num + 1; j++) {
	if(j==0 && i != 0){printf("%d ",i);}        
	if(i==0){printf("%d ",j);}        
	if (j != 0 && i != 0 && j<num+1) {
	  if(grid[i][j] != 'x') grid[i][j] = ' ';
          printf("%c ", grid[i][j]);
      }
      
    }
	printf("\n");
  }
    int dir = 0;
  printf("What direction do you want to go (0 up, 1 right, 2 down, 3 left): ");
  scanf("%d", &dir);
  if((dir == 0 && px == 1) || (dir == 1 && py == num) || (dir == 2 && px == num) || (dir == 3 && py == 1) ){
     printf("You are going past the borders\n\n");
  }else{
  if(dir==0)setUp();
  else if(dir==1)setRight();
  else if(dir==2)setDown();
  else if(dir==3)setLeft();
  else{
    printf("Incorrect input");
  }
  if(grid[px][py]=='x')grid[px][py]=' ';
  else if(grid[px][py]==' ')grid[px][py]='x';
 }
 }
}

void setLeft(void){
  py = py -1 ;
}

void setUp(void){
  px = px -1 ;
}
void setDown(void){
  px = px +1 ;
}
void setRight(void){
  py = py +1 ;
}
