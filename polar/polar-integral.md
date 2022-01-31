# 극좌표에서의 넓이

만약 극좌표에서 정의된 함수 $r(\theta)=1$이 이루는 넓이를 구하고자 하면 어떻게 해야될까 만약 일반적인 직교 좌표계에서와 같이 구한다면 $\int_0^{2\pi}{r(\theta)d\theta}=[\theta]^{2\pi}_{0}=2\pi$가 된다. 하지만 $r(\theta)$ 이루는 도형은 원이므로 넓이는 $\pi$이다.

직교 좌표계에서 넓이는 직사각형을 이용한 구분구적법을 통해 구한다.
극좌표에서도 구분구적법을 사용하는 것은 변함이 없지만, 부채꼴을 이용한다.

만약 $r(\theta)$의 $\theta=a\to\theta=b$의 넓이를 구하고자 한다면

$\Delta\theta=\frac{b-a}{n}$일 때, 부채꼴의 넓이는 $\frac{1}{2}r^2\theta$이므로 $$\lim_{n\to\infty}\sum^{n}_{k=1}\frac{1}{2}(r(a+k\Delta\theta))^2\Delta\theta$$

가 된다.

이때 이 꼴을 정적분꼴로 바꾸면 다음과 같다.

$$\int_{a}^{b}{\frac{1}{2}(r(\theta))^2d\theta}$$

이를 다시 처음 예시에서 적용 시켜보면

$$\int_0^{2\pi}{\frac 1 2 1^2d\theta}=[\frac 1 2 \theta]^{2\pi}_{0}=\pi$$

성립하는 것을 볼 수 있다.


